import React, { lazy, Suspense } from 'react';

const LazyFileExplorer = lazy(() => import('./FileExplorer'));

const FileExplorer = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFileExplorer {...props} />
  </Suspense>
);

export default FileExplorer;
