import React, { lazy, Suspense } from 'react';

const LazyFolder = lazy(() => import('./Folder'));

const Folder = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFolder {...props} />
  </Suspense>
);

export default Folder;
