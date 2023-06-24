import React, { PropsWithChildren } from 'react';
import { nanoid } from 'nanoid';
import emojiRegex from 'emoji-regex';
import * as linkify from 'linkifyjs';
import { findAndReplace, ReplaceFunction } from 'mdast-util-find-and-replace';
import RootReactMarkdown, { NodeType } from 'react-markdown';
import ReactMarkdown from 'react-markdown/with-html';
import uniqBy from 'lodash.uniqby';

import type { UserResponse } from 'stream-chat';
import type { Root } from 'mdast';
import type { DefaultStreamChatGenerics } from './types/types';

const isOnlyEmojis = (text?: string) => {
  if (!text) return false;

  const noEmojis = text.replace(emojiRegex(), '');
  const noSpace = noEmojis.replace(/[\s\n]/gm, '');

  return !noSpace;
};

const allowedMarkups: NodeType[] = [
  'html',
  // @ts-expect-error
  'root',
  'text',
  'break',
  'paragraph',
  'emphasis',
  'strong',
  'link',
  'list',
  'listItem',
  'code',
  'inlineCode',
  'blockquote',
  'delete',
];

const matchMarkdownLinks = (message: string) => {
  const regexMdLinks = /\[([^[]+)\](\(.*\))/gm;
  const matches = message.match(regexMdLinks);
  const singleMatch = /\[([^[]+)\]\((.*)\)/;

  const links = matches
    ? matches.map((match) => {
        const i = singleMatch.exec(match);
        return i && [i[1], i[2]];
      })
    : [];

  return links.flat();
};

const messageCodeBlocks = (message: string) => {
  const codeRegex = /```[a-z]*\n[\s\S]*?\n```|`[a-z]*[\s\S]*?`/gm;
  const matches = message.match(codeRegex);
  return matches || [];
};

const detectHttp = /(http(s?):\/\/)?(www\.)?/;

function formatUrlForDisplay(url: string) {
  try {
    return decodeURIComponent(url).replace(detectHttp, '');
  } catch (e) {
    return url;
  }
}

function encodeDecode(url: string) {
  try {
    return encodeURI(decodeURIComponent(url));
  } catch (error) {
    return url;
  }
}

const markDownRenderers: { [nodeType: string]: React.ElementType } = {
  // eslint-disable-next-line react/display-name
  link: ({ children, href }: PropsWithChildren<MarkDownRenderers>) => {
    const isEmail = href?.startsWith('mailto:');
    const isUrl = href?.startsWith('http');

    if (!href || (!isEmail && !isUrl)) {
      return children;
    }

    return (
      <a
        className={`${isUrl ? 'str-chat__message-url-link' : ''}`}
        href={href}
        rel='nofollow noreferrer noopener'
        target='_blank'
      >
        {children}
      </a>
    );
  },
  span: 'span',
};

const emojiMarkdownPlugin = () => {
  function replace(match: RegExpMatchArray | null) {
    return {
      children: [{ type: 'text', value: match }],
      className: 'inline-text-emoji',
      type: 'span',
    };
  }

  const transform = <T>(markdownAST: T) => {
    findAndReplace(markdownAST as Root, emojiRegex(), replace as ReplaceFunction);
    return markdownAST;
  };

  return transform;
};

const mentionsMarkdownPlugin = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
>(
  mentioned_users: UserResponse<StreamChatGenerics>[],
) => () => {
  const mentioned_usernames = mentioned_users
    .map((user) => user.name || user.id)
    .filter(Boolean)
    .map(escapeRegExp);

  function replace(match: string) {
    const usernameOrId = match.replace('@', '');
    const user = mentioned_users.find(({ id, name }) => name === usernameOrId || id === usernameOrId);
    return {
      children: [{ type: 'text', value: match }],
      mentioned_user: user,
      type: 'mention',
    };
  }

  const transform = <T>(markdownAST: T) => {
    if (!mentioned_usernames.length) {
      return markdownAST;
    }
    const mentionedUsersRegex = new RegExp(
      mentioned_usernames.map((username) => `@${username}`).join('|'),
      'g',
    );
    findAndReplace(markdownAST as Root, mentionedUsersRegex, replace as ReplaceFunction);
    return markdownAST;
  };

  return transform;
};

type MentionProps<
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
> = {
  mentioned_user: UserResponse<StreamChatGenerics>;
};

const Mention = <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(
  props: PropsWithChildren<MentionProps<StreamChatGenerics>>,
) => <span className='str-chat__message-mention'>{props.children}</span>;

export type RenderTextOptions = {
  customMarkDownRenderers?: {
    [nodeType: string]: React.ElementType;
  };
};

export const renderText = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
>(
  text?: string,
  mentioned_users?: UserResponse<StreamChatGenerics>[],
  options: RenderTextOptions = {},
) => {
  if (!text) return null;

  let newText = text;
  const markdownLinks = matchMarkdownLinks(newText);
  const codeBlocks = messageCodeBlocks(newText);

  uniqBy(linkify.find(newText), 'value').forEach(({ href, type, value }) => {
    const linkIsInBlock = codeBlocks.some((block) => block?.includes(value));
    const noParsingNeeded =
      markdownLinks &&
      markdownLinks.filter((text) => {
        const strippedHref = href?.replace(detectHttp, '');
        const strippedText = text?.replace(detectHttp, '');

        if (!strippedHref || !strippedText) return false;

        return strippedHref.includes(strippedText) || strippedText.includes(strippedHref);
      });

    if (noParsingNeeded.length > 0 || linkIsInBlock) return;

    try {
      if (type === 'email' && mentioned_users) {
        const emailMatchesWithName = mentioned_users.some((u) => u.name === value);
        if (emailMatchesWithName) {
          newText = newText.replace(new RegExp(escapeRegExp(value), 'g'), (match, position) => {
            const isMention = newText.charAt(position - 1) === '@';
            return isMention ? match : `[${match}](${encodeDecode(href)})`;
          });

          return;
        }
      }

      const displayLink = type === 'email' ? value : formatUrlForDisplay(href);

      newText = newText.replace(
        new RegExp(escapeRegExp(value), 'g'),
        `[${displayLink}](${encodeDecode(href)})`,
      );
    } catch (e) {
      void e;
    }
  });

  const plugins = [emojiMarkdownPlugin];

  if (mentioned_users?.length) {
    plugins.push(mentionsMarkdownPlugin(mentioned_users));
  }

  const renderers = {
    mention: Mention,
    ...markDownRenderers,
    ...options.customMarkDownRenderers,
  };

  return (
    <ReactMarkdown
      allowedTypes={allowedMarkups}
      escapeHtml={true}
      plugins={plugins}
      renderers={renderers}
      source={newText}
      transformLinkUri={(uri) => (uri.startsWith('app://') ? uri : RootReactMarkdown.uriTransformer(uri))}
      unwrapDisallowed={true}
    />
  );
};

export function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}

/**
 * @deprecated will be removed in the next major release
 */
export const generateRandomId = nanoid;

export const getWholeChar = (str: string, i: number) => {
  const code = str.charCodeAt(i);

  if (Number.isNaN(code)) return '';

  if (code < 0xd800 || code > 0xdfff) return str.charAt(i);

  if (0xd800 <= code && code <= 0xdbff) return str.slice(i, i + 2);

  if (0xdc00 <= code && code <= 0xdfff) return str.slice(i - 1, i + 1);

  return str.charAt(i);
};
