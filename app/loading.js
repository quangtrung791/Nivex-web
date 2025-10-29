// import Preloader from '../components/elements/Preloader'
export default function loading() {
    return (
        
        <div className="nvx-page-loader" role="status" aria-live="polite">
            <div className="nvx-spinner" aria-hidden="true" />
            <span className="nvx-loader-text">Đang tải...</span>
        </div>
    );
}
