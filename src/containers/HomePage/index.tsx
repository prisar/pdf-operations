import useScript from "../../hooks/useScript";
import "./index.css";

export function HomePage() {
  useScript("https://documentcloud.adobe.com/view-sdk/main.js");
  useScript("./pdf.js");

  return (
    <div>
      <div className="pdf-view">
        <div id="adobe-dc-view"></div>
      </div>
      <div>Please refresh if it doesn't load</div>
    </div>
  );
}

export default HomePage;
