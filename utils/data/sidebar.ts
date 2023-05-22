const config = useRuntimeConfig();

export const items = [
  [
    { name: config.public.sidebar.home },
    { name: config.public.sidebar.add },
    { name: config.public.sidebar.search },
  ],
  [
    { name: config.public.sidebar.tooltip },
    { name: config.public.sidebar.settings },
    { name: config.public.sidebar.user },
  ],
];
