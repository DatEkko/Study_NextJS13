import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    show: boolean;
    setShow: (value: boolean) => void;
}

const ModalAddNewBlog = (props: IProps) => {
    const { show, setShow } = props;
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handelSubmit = () => {
        if (!title) {
            toast.error("Title is empty");
            return
        }

        if (!author) {
            toast.error("Author is empty");
            return
        }

        if (!content) {
            toast.error("Content is empty");
            return
        }

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, content })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Create succeed!!!");
                    handleClose();
                    mutate("http://localhost:8000/blogs")
                } else {
                    toast.error("Create fail!!!")
                }
            })
    }

    const handleClose = () => {
        setShow(false);
        setTitle('');
        setAuthor('');
        setContent('');
    }

    return (
        <>
            <Modal
                backdrop="static"
                show={show}
                size='lg'
                onHide={() => handleClose()}>

                <Modal.Header closeButton>
                    <Modal.Title>Create New A Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                onChange={(event) => setContent(event.target.value)}
                                value={content}
                                as="textarea"
                                rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={() => handelSubmit()}>
                        Create
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNewBlog;