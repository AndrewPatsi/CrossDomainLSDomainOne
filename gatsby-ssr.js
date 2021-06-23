/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react")
//const Layout = require("./src/components/layout")

exports.onRenderBody = ({
	setHeadComponents,
	// setPreBodyComponents,
	// setPostBodyComponents,
  }, pluginOptions) => {
	setHeadComponents([
	  <script
		key="1"
		type="text/javascript"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
	  />,
	])
	// setPreBodyComponents([
	//   <script
	// 	key="2"
	// 	type="text/javascript"
	// 	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/core.js"
	//   />,
	// ])
	// setPostBodyComponents([
	//   <script
	// 	key="3"
	// 	type="text/javascript"
	// 	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.js"
	//   />,
	// ])
  }