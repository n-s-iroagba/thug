import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Modal,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { Celebrity, CreateCelebrity } from "../types/Celebrity";
const initialForm =   {
    stageName: "",
    firstName: "",
    surname: "",
    bio: "",
    image: "",
  }
const CelebrityManager: React.FC<{isUnVerified?:boolean}> = ({isUnVerified}) => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [filteredCelebrities, setFilteredCelebrities] = useState<Celebrity[]>(
    []
  );
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<CreateCelebrity|Celebrity>(initialForm);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [celebrityToDelete, setCelebrityToDelete] = useState<Celebrity | null>(
    null
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredCelebrities(
      celebrities.filter(
        (c) =>
          c.stageName.toLowerCase().includes(lower) ||
          c.firstName.toLowerCase().includes(lower) ||
          c.surname.toLowerCase().includes(lower)
      )
    );
  }, [search, celebrities]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setCelebrities((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...form } : c))
      );
    } else {
      const newCelebrity: Celebrity = {
        ...form,
        id: Date.now(),
        isConfirmed: false,
        clubMemberships: [],
      };
      setCelebrities((prev) => [...prev, newCelebrity]);
    }

    setForm(initialForm);
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (celeb: Celebrity | CreateCelebrity) => {
    setForm(celeb);
    if ('id' in celeb && celeb.id) {
      setEditingId(celeb.id);
    }
    setShowModal(true);
  };
  


  const handleDelete = (celeb: Celebrity) => {
    setCelebrityToDelete(celeb);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (celebrityToDelete) {
      setCelebrities((prev) =>
        prev.filter((c) => c.id !== celebrityToDelete.id)
      );
    }
    setShowDeleteModal(false);
    setCelebrityToDelete(null);
  };

  return (
    <div className="p-4">
      <h2 className="mb-3">Celebrity Manager</h2>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search celebrities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setShowModal(true)}>Add Celebrity</Button>
      </InputGroup>

      <Row>
        {filteredCelebrities.map((celeb) => (
          <Col key={celeb.id} md={4}>
            <Card className="mb-4">
              {celeb.image && (
                <Card.Img
                  variant="top"
                  src={celeb.image}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{celeb.stageName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {celeb.firstName} {celeb.surname}
                </Card.Subtitle>
                <Card.Text>{celeb.bio}</Card.Text>
                <Card.Text>
                  <strong>Confirmed:</strong> {celeb.isConfirmed ? "Yes" : "No"}
                </Card.Text>
                <Card.Text>
                  <strong>clubMemberships:</strong>
                  {celeb.clubMemberships.length > 0 ? (
                    <ul className="mt-2">
                      {celeb.clubMemberships.map((m) => (
                        <li key={m.id}>
                          <strong>Tier:</strong> {m.tier} <br />
                          <strong>Price:</strong> ${m.price.toFixed(2)} <br />
                          <strong>Features:</strong>{" "}
                          {m.features.length > 0
                            ? m.features.join(", ")
                            : "None"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    " None"
                  )}
                </Card.Text>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(celeb)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(celeb)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit" : "Add"} Celebrity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Stage Name</Form.Label>
              <Form.Control
                required
                value={form.stageName}
                onChange={(e) =>
                  setForm({ ...form, stageName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                required
                value={form.surname}
                onChange={(e) => setForm({ ...form, surname: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                required
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
                className="me-2"
              >
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{celebrityToDelete?.firstName}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CelebrityManager;
