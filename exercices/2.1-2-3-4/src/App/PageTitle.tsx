interface PageTitleProps {
  title: string;
}

const PageTitle = (props: PageTitleProps) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};

export default PageTitle;