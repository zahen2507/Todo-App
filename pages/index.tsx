import React, { useState } from 'react'
import styles from '@/styles/Home.module.css'
import { Layout } from '@/components/layout'
import { Card } from '@/components/card'
import { getRunningQueriesThunk, getTodoLists, useAddTodoListMutation, useGetTodoListsQuery } from './api/api'
import { wrapper } from '@/stores/store'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { CardTodo } from '@/components/card/cardTodo'

export default function Home() {
  const [page, setPage] = useState(1)
  const { data: todolists = [], isLoading, isFetching, isError } = useGetTodoListsQuery(page)
  const [addTodo] = useAddTodoListMutation()

  const handleAddTodo = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      userId: { value: string };
      title: { value: string };
    };
    const userId = parseInt(target.userId.value);
    const title = target.title.value;
    const completed = false;
    addTodo({ userId, title, completed })
  }

  return (
    <>
      <Layout>
        <h1 className={styles.textHead}>TO - DO LIST</h1>

        <Card todo={false} style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <form onSubmit={(e) => handleAddTodo(e)}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                <Input label='User Id' id='userId' name='userId' type='number' style={{ width: '150px' }} />
                <Input label='Title' id='title' name='title' type='text' style={{ flex: 'auto' }} />
                <Button label="Add List" />
              </div>
          </form>
        </Card>

        {isLoading || isFetching ? (
          <div className={styles.loading}>
            <div className={styles.ring}></div>
            <span className={styles.load}>Loading...</span>
          </div>
        ) : isError ? (
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 700, color: 'rgba(0, 0, 0, 0.452)' }}>Error...</div>
        ) : (
          <div className={styles.gridContainer}>
            {todolists?.map((value, index) => (
              <>
                <CardTodo data={value} index={index} />
              </>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 20 }}>
          <Button label="Prev" disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)} />
          <Button label="Next" disabled={todolists.length < 10} onClick={() => setPage((prev) => prev + 1)} />
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getTodoLists.initiate(1));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);