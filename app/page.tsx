import Form from "../components/form";
import Warning from "../components/warning";

export default function Page() {
  return (
    <main className="main text-light">
      <div className="container">
        <h1>BlueSky Custom Domain Helper</h1>
        <div className="alert alert-danger my-2">
           Version 1.6 of the official client supports assigning Custom Domains, so there is no need to use this tool
        </div>
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
