import "./index.css";
import PdfView from '../../../components/PdfView';
import PdfUpload from '../../../components/PdfUpload';
import { Button } from 'react-bootstrap';

export function DocSignPage() {

  return (
    <div>
      <PdfUpload />

      {/* <PdfView divId="adobe-dc-view-2" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" /> */}
    </div>
  );
}

export default DocSignPage;
