const SkeletonLoader = () => {
    return (
      <div className="flex flex-col p-4 rounded-md  shadow-sm bg-gradient-to-r bg-white dark:from-zinc-950 cursor-default dark:via-neutral-950 dark:to-neutral-950 h-fit border dark:bg-black animate-pulse">
        <div className="h-6 bg-neutral-300 dark:bg-neutral-700 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded mb-4 w-full"></div>
        <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded w-1/3"></div>
      </div>
    );
  };

  const Loaders = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  };
  
  export default Loaders;