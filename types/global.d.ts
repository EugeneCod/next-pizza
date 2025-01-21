interface PageWithParams {
  params: { id: string };
}

interface PageWithSearchParams<T> {
  searchParams: T;
}

interface PropsWithClassName {
  className?: string;
}
