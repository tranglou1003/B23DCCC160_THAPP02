/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

function getRenderedText(renderer: ReactTestRenderer.ReactTestRenderer) {
  const collectText = (
    node:
      | ReactTestRenderer.ReactTestRendererJSON
      | ReactTestRenderer.ReactTestRendererJSON[]
      | string
      | null,
  ): string => {
    if (node === null) {
      return '';
    }
    if (typeof node === 'string') {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map(child => collectText(child)).join(' ');
    }
    return node.children?.map(child => collectText(child)).join(' ') ?? '';
  };

  return collectText(renderer.toJSON());
}

test('renders the student dashboard and its required sections', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  const renderedText = getRenderedText(renderer);

  expect(renderedText).toContain('Minh Anh');
  expect(renderedText).toContain('Tổng quan');
  expect(renderedText).toContain('Môn học của tôi');
  expect(renderedText).toContain('Thiết kế giao diện');
  expect(renderedText).toContain('Lập trình di động');
  expect(renderedText).toContain('Cơ sở dữ liệu');
  expect(renderedText).toContain('Tiếng Anh chuyên ngành');
  expect(renderedText).toContain('Trang chủ');
  expect(renderedText).toContain('Môn học');
  expect(renderedText).toContain('Bài tập');
  expect(renderedText).toContain('Cá nhân');
});

test('filters courses by the search input', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  await ReactTestRenderer.act(() => {
    renderer.root
      .findAll(node => node.props.accessibilityLabel === 'Tìm kiếm môn học')[0]
      .props.onChangeText('cơ sở');
  });

  const renderedText = getRenderedText(renderer);

  expect(renderedText).toContain('Cơ sở dữ liệu');
  expect(renderedText).not.toContain('Thiết kế giao diện');
});

test('toggles between light and dark appearance', async () => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  const toggle = renderer.root.findAll(
    node =>
      node.props.accessibilityLabel === 'Bật chế độ tối' ||
      node.props.accessibilityLabel === 'Bật chế độ sáng',
  )[0];
  const initialLabel = toggle.props.accessibilityLabel;

  await ReactTestRenderer.act(() => {
    toggle.props.onPress();
  });

  const updatedToggle = renderer.root.findAll(
    node =>
      node.props.accessibilityLabel === 'Bật chế độ tối' ||
      node.props.accessibilityLabel === 'Bật chế độ sáng',
  )[0];

  expect(updatedToggle.props.accessibilityLabel).not.toBe(initialLabel);
});
