import Form from "../components/form";
import Warning from "../components/warning";

export default function Page() {
  return (
    <main className="main text-light">
      <div className="container">
        <h1>BlueSky Custom Domain Helper</h1>
        <Form />
        <Warning />
        Made by{" "}
        <a rel="noopener noreferrer" href="https://haideralipunjabi.com">
          Haider Ali Punjabi
        </a>
        <br />
        View code on{" "}
        <a
          href="https://github.com/haideralipunjabi/bsky-custom-domain-helper"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </main>
  );
}
