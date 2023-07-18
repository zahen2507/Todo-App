import styles from './../../styles/Card.module.css'
export const Card = (props: any) => {
  const { children, style, keys } = props
  return (
    <div key={keys} className={props.todo ? styles.card :  styles.cardTodo} style={style}>
      {children}
    </div>
  )
}
