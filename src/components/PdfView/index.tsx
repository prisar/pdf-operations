import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import usePdfScript from "../../hooks/usePdfScript";
import "./index.css";
import useScript from '../../hooks/useScript';

interface IProps {
    divId: string;
    location: string;
    fileName: string;
    // any other props that come into the component
}

export function PdfView({ divId, location, fileName }: IProps) {
  const clientId = localStorage.getItem('ADOBE_PDF_VIEW_CLIENT_ID');
  const jsocde = `document.addEventListener("adobe_dc_view_sdk.ready", function () {
        var adobeDCView = new AdobeDC.View({ clientId: "${clientId}", divId: "${divId}" });
        adobeDCView.previewFile({
          content: { location: { url: "${location}" } },
          metaData: { fileName: "${fileName}" },
        });
      });
      `;
  usePdfScript(jsocde);
  useScript("https://documentcloud.adobe.com/view-sdk/main.js");

  return (
    <div>
      <div className="pdf-view">
        <div id={divId}></div>
      </div>
      <div>Please refresh if it doesn't load</div>
    </div>
  );
}

PdfView.propTypes = {
    divId: PropTypes.oneOfType([PropTypes.string]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default PdfView;
