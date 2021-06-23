import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>It is domain.one page</h1>
    <p>
      <Link to="http://localhost:3000">Go to domain.two page</Link> <br />
      It should be started on locallhost:3000 domain.
    </p>
    <h2>Here goes the iframe from domain.two</h2>
    <iframe className="domain-one-canv" id="domainTwoFrame" name="domainTwoFrame"  src="http://localhost:3000" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency allowfullscreen height="100%" width="100%"></iframe>

    <div>
      <form className="form-storage" id="StorageForm" name="formStorage" action="http://localhost:3000" method="get" target="domainTwoFrame">
        <fieldset>
          <legend>
            Storage Method
          </legend>
          <p>
            <label for="formSet">
              <input id="formSet" type="radio" name="method" value="set" checked />
              Set
            </label>
            <label for="formGet">
              <input id="formGet" type="radio" name="method" value="get" />
              Get
            </label>
            <label for="formRemove">
              <input id="formRemove" type="radio" name="method" value="remove" />
              Remove
            </label>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            Set data
          </legend>
          <p>
            <label for="formKey">Key:</label>
            <input id="formKey" name="key" type="text" placeholder="name" required />
          </p>
          <p>
            <label for="formValue">Value:</label>
            <input id="formValue" name="value" type="text" placeholder="Jack" />
          </p>
        </fieldset>
        <fieldset>
            <legend>
              Callback
            </legend>
            <label for="formCallback">
              <input id="formCallback" type="checkbox" name="confirm" />
              I need to provide callback function
            </label>
            <textarea id="formTextarea" name="callback" rows="10" cols="45" disabled></textarea>
        </fieldset>
        <fieldset className="submit-form">
          <legend>
            Send request
          </legend>
          <p>
            <input type="submit" />
          </p>
        </fieldset>
      </form>
    </div>
    <script 
      src="/domainOne.js" 
      type="text/javascript"
    ></script>
  </Layout>
)

export default IndexPage
