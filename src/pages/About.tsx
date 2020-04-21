import * as React from "react";

const About = () => (
  <div>
    <h1 className="title">Australian Tech Events</h1>
    <p className="subtitle">Welcome to the Australia Technology Events list.</p>
    <p className="subtitle">
      <a href="https://readify.net">Readify</a>, with the support of the
      Australian IT community, maintains a list of conferences that are
      happening all across Australia on their{" "}
      <a href="https://github.com/readify/devevents" target="_blank">
        GitHub
      </a>
      .
    </p>
    <p className="subtitle">
      I,{" "}
      <a href="https://www.aaron-powell.com" target="_blank">
        Aaron Powell
      </a>
      , decided to create a website to allow you to easily interact with the
      data that is stored in the markdown files on GitHub by offering sorting
      and filtering. Mostly this was built as an{" "}
      <a href="https://github.com/aaronpowell/oz-dev-events" target="_blank">
        experiment using WebAssembly and Go.
      </a>
      It's hosted on{" "}
      <a href="https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website?WT.mc_id=ozdevevents-demo-aapowell">
        Azure Static Websites
      </a>
      .
    </p>
  </div>
);

export default About;
