import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Form, FormGroup, Label, Input, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isAuth, getCookie } from '../../actions/auth';
import {create, getTags, removeTag, singleTag} from '../../actions/tag';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Tag = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const [modal, setModal] = useState(false);
    const [deleteSlug, setDeleteSlug] = useState('');

    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags()
    }, [reload])

    const loadTags = () => {
        getTags().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setValues(values => ({ ...values, tags: data }))
            }
        });
    };

    const showTags = () => {
        return tags.map((c, i) => {
            return (
                
                <div className='btn-group' role='group' key={i}>
                    <button 
                        title = "Double click to delete" 
                        type="button" 
                        className="btn btn-outline-primary mr-1 ml-1 mt-3" 
                        onClick={() => toggleModal(c.slug)}>
                        <span>{c.name}</span>
                        <i className="bi bi-x ml-2 delete-icon"></i>
                    </button>
                </div>
            )
        });
    };

    const toggleModal = (slug = '') => {
        setDeleteSlug(slug);
        setModal(!modal);
    };

    const deleteTag = () => {
        if (deleteSlug) {
            removeTag(deleteSlug, token).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues(values => ({
                        ...values,
                        error: false,
                        success: false,
                        name: '',
                        removed: true,
                        reload: !reload
                    }));
                    toggleModal();
                }
            });
        }
    };

    const clickSubmit = e => {
        e.preventDefault();
        create({ name }, token).then(data => {
            if (data.error) {
                setValues(values => ({ ...values, error: data.error, success: false }));
            } else {
                setValues(values => ({ ...values, error: false, success: true, name: '', removed: false, reload: !reload }));
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: false });
    };

    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Tag created successfully</p>;
        }
    }

    const showError = () => {
        if (error) {
            return <p className="text-danger">Tag already exists</p>;
        }
    }
    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Tag removed successfully</p>;
        }
    }

    const newTagForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </div>
        </form>
    );

    return <React.Fragment>
        {showSuccess()}
        {showError()}
        {showRemoved()}
        {newTagForm()}
        
        {showTags()}
        

        <Modal isOpen={modal} toggle={() => toggleModal('')}>
            <ModalHeader toggle={() => toggleModal('')} close={<button className="close" onClick={() => toggleModal('')}>&times;</button>}>
                Delete Tag
            </ModalHeader>   
                <ModalBody>
                    Are you sure you want to delete this Tag?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteTag}>Delete</Button>
                    <Button color="secondary" onClick={() => toggleModal('')}>Cancel</Button>
                </ModalFooter>
            </Modal>

    </React.Fragment>;
};

export default Tag;