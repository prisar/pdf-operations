import "./index.css";
import PdfView from '../../../components/PdfView';

export function MergePage() {
  return (
    <div>
      <PdfView divId="adobe-dc-view-1" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" />
      <PdfView divId="adobe-dc-view-2" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" />
      {/* <PdfView /> */}
    </div>
  );
}

export default MergePage;
