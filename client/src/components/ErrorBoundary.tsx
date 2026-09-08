import { ArrowLeft, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error("[TEMPO render boundary]", { name: error.name, message: error.message });
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="tempo-boot-fallback" role="alert" aria-labelledby="render-fallback-title">
          <div className="tempo-boot-fallback__mark">V2JOY</div>
          <p>TEMPO 3ML</p>
          <h1 id="render-fallback-title">Có một gián đoạn<br /><em>khi mở nội dung.</em></h1>
          <span aria-hidden="true" />
          <p className="tempo-boot-fallback__support">Thông tin COD chưa được ghi nhận. Bạn có thể tải lại hoặc quay về trang TEMPO.</p>
          <div className="flex gap-3 flex-wrap mt-3">
            <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 bg-[#17251f] text-white px-4 py-3 font-bold text-sm"><RotateCcw size={16} /> Tải lại trang</button>
            <a href="/" className="inline-flex items-center gap-2 border border-[#17251f] text-[#17251f] px-4 py-3 font-bold text-sm"><ArrowLeft size={16} /> Về TEMPO</a>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
