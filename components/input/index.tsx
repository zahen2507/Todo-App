import styles from './../../styles/Input.module.css'

export const Input = (props : any) => {
    return(
    <div className={styles.inputGroup} style={props.style}>
        <label className={styles.label}>{props.label}</label>
        <input className={styles.input} type={props.type} id={props.id} name={props.name}/>
    </div>
    )
}