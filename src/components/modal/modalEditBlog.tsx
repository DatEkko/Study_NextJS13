import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    show: boolean;
    setShow: (value: boolean) => void;
    blogEdit: IBlog | null;
    setBlogEdit: (value: IBlog | null) => void;
}

const ModalEditBlog = (props: IProps) => {
    const { show, setShow, blogEdit, setBlogEdit } = props;
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        if (blogEdit) {
            setId(blogEdit.id);
            setTitle(blogEdit.title);
            setAuthor(blogEdit.author);
            setContent(blogEdit.content);
        }

    }, [blogEdit])

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

        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, content })
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Update blog succeed!!!");
                    handleClose();
                    mutate("http://localhost:8000/blogs")
                } else {
                    toast.error("Update fail!!!")
                }
            })
    }

    const handleClose = () => {
        setShow(false);
        setTitle('');
        setAuthor('');
        setContent('');
        setBlogEdit(null);
    }

    return (
        <>
            <Modal
                backdrop="static"
                show={show}
                size='lg'
                onHide={() => handleClose()}>

                <Modal.Header closeButton>
                    <Modal.Title>Update a blog</Modal.Title>
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
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditBlog;