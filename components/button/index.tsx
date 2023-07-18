import styles from '../../styles/Button.module.css'

export const Button = (props: any) => {
    return (
        <div className={styles.buttonContainer}>
            <button type="submit" disabled={props.disabled} onClick={props.onClick} className={styles.button} style={props.disabled ? {cursor: 'no-drop'} : {cursor: 'pointer'}}>{props.label}</button>
        </div>
    )
}