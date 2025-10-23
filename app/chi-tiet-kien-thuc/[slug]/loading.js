export default function Loading() {
    return (
      <div className="nvx-page-loader" role="status" aria-live="polite">
        <div className="nvx-spinner" aria-hidden="true" />
        <span className="nvx-loader-text">Đang tải dữ liệu...</span>
      </div>
    );
  }
  