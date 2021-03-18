import "./index.css";
import PdfView from '../../../components/PdfView';
import PdfUpload from '../../../components/PdfUpload';
import { Button } from 'react-bootstrap';

export function MergePage() {

  const merge = async () => {
    // merge api call
  }

  return (
    <div>
      <PdfUpload />
      <PdfUpload />

      <Button variant="primary" onClick={merge}>
        Start Merging
      </Button>

      <Button variant="primary" onClick={merge}>
        Merge
      </Button>
      {/* <PdfView divId="adobe-dc-view-1" location="http://localhost:8000/api/v1/pdf/download?file=reorderPagesInput.pdf" fileName="reorderPagesInput.pdf" /> */}
      {/* <PdfView divId="adobe-dc-view-2" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" /> */}
    </div>
  );
}

export default MergePage;
