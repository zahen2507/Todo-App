import styles from '../../styles/Badge.module.css'

export const Badge = (props : any) => {
    return(
        <div>
            <span className={styles.badge} style={props.style}>{props.label}</span>
        </div>
    )
}