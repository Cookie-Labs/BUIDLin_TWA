```
    <ErrorBoundary fallback={<GlobalError />}>
        <Layout>
            <Template>
                <ErrorBoundary fallback={<Error />}>
                    <Suspense fallback={<Loading />}>
                        <ErrorBoundary fallback={<NotFound />}>
                            <Page />
                        </ErrorBoundary>
                    </Suspense>
                </ErrorBoundary>
            </Template>
        </Layout>
    </ErrorBoundary>
```