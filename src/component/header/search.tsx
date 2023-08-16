import styles from '../../../styles/header.module.scss';
import { Form, Input } from 'reactstrap';
import {useState, FormEvent} from 'react'
import {useRouter} from 'next/router';

const Search = () => {
    const router = useRouter();
    const [search, setSearch] = useState(true);
    const [searchName, setSearchName] = useState('');

    const handleSearch =  async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/pokemons/${searchName}`)
        setSearchName('')
    }

    return (
        <>
            <div className={styles.search}>
                <Form className={styles.form} onSubmit={handleSearch}>
                    <Input value={searchName} onChange={(e) => {setSearchName(e.currentTarget.value)}} name='search' type="search" placeholder='Pesquise aqui...'  className={styles.input}/>
                </Form>
            </div>
        </>
    )
}
export default Search;