import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FileExplorer from './FileExplorer';

describe('<FileExplorer />', () => {
  test('it should mount', () => {
    render(<FileExplorer />);

    const fileExplorer = screen.getByTestId('FileExplorer');

    // expect(fileExplorer).toBeInTheDocument();
  });
});
