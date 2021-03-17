import "./index.css";
import PdfView from '../../../components/PdfView';
import PdfUpload from '../../../components/PdfUpload';
import { Button } from 'react-bootstrap';

export function SplitPage() {

  const split = async () => {
    // split api call
  }

  return (
    <div>
      <PdfUpload />

      {/* Enter page range */}

      <Button variant="primary" onClick={split}>
        Split
      </Button>
      <PdfView divId="adobe-dc-view-1" location="http://localhost:8000/api/v1/pdf/download?file=3087.pdf" fileName="3087.pdf" />
      {/* <PdfView divId="adobe-dc-view-2" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" /> */}
    </div>
  );
}

export default SplitPage;
