import React from 'react';
import { Skeleton, Card, CardContent } from '@mui/material';

const NewsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-25 mb-20">
      {[1, 2, 3, 4].map((item) => (
        <Card key={item} className="p-4 shadow-md rounded-2xl">
          <Skeleton variant="rectangular" width="100%" height={200} className="mb-4" />
          <CardContent>
            <Skeleton variant="text" width="60%" height={40} className="mb-2" />
            <Skeleton variant="text" width="90%" height={20} className="mb-1" />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NewsCardSkeleton;
