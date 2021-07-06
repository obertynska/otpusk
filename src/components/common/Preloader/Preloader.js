import s from "./Preloader.module.css"

const Preloader = () => {
    return (
        <div className={s.preloader_wrapper}>
        <div className={s.sk_fading_circle}>
            <div className={`${s.sk_circle}`}></div>
            <div className={`${s.sk_circle2} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle3} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle4} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle5} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle6} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle7} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle8} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle9} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle10} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle11} ${s.sk_circle}`}></div>
            <div className={`${s.sk_circle12} ${s.sk_circle}`}></div>
        </div>
        </div>
    )
}

export default Preloader