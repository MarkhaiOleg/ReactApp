import React from 'react';
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'


const PostFilter = ({ filter, setFilter }) => {
    return (

        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                placeholder="Пошук..."
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                defaultValue="Сортування по"
                options={[
                    { value: 'title', name: 'За назвою' },
                    { value: 'body', name: 'По опису' },
                ]}
            />
        </div>
    )
}

export default PostFilter;