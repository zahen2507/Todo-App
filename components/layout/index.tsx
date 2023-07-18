import Head from "next/head";

export const Layout = (props: any) => {
  const { children } = props;
  return (
    <div>
      <Head>
        <title>Todo App</title>
      </Head>
      <div className="container">
        <div className="main-content">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};
