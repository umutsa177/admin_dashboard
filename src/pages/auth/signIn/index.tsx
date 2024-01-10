import {NextPage} from 'next'
import {
    Button, Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap'
import {SyntheticEvent, useState, CSSProperties} from 'react'
import {ClipLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
import { CiUser } from "react-icons/ci";


const Login: NextPage = () => {
    const [color, setColor] = useState("#ffffff");
    const [submitting, setSubmitting] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: SyntheticEvent) => {
        e.stopPropagation()
        e.preventDefault()
        try {
            const body = {
                email: email,
                password: password
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">

            <Container className='d-flex justify-content-center'>
                {
                    loading ?
                        <div className='d-flex align-items-center flex-column justify-content-center'>
                            <div>
                                <ClipLoader color={color} loading={loading} cssOverride={override} size={75} />
                            </div>
                            <div className="mt-1">
                                Giriş Yapılıyor...
                            </div>
                        </div>

                        : (
                            <Col md={6} className="bg-white border p-5">
                                <div className="">
                                    <h1>ADMIN</h1>
                                    <p className="text-black-50">Giriş Yapın</p>

                                    <form onSubmit={handleLogin}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>
                                                <CiUser />
                                            </InputGroup.Text>
                                            <Form.Control
                                                name="email"
                                                required
                                                disabled={submitting}
                                                placeholder="email"
                                                aria-label="email"
                                                defaultValue="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>

                                            </InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                required
                                                disabled={submitting}
                                                placeholder="Password"
                                                aria-label="Password"
                                                defaultValue="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </InputGroup>

                                        <Button type={'submit'} className='btn-outline-light'>
                                            Giriş Yap
                                        </Button>


                                    </form>
                                </div>
                            </Col>
                        )
                }


            </Container>
        </div>
    )
}

export const getServerSideProps = async (context: any) => {
    const token = context.req?.cookies?.token || null;

    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {}
    };
}

export default Login
