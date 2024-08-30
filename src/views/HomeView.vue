<template>
  <div class="container">
    <h1>Home Page</h1>
    <button class="add-btn" @click="openModal('add')">Add</button>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Post</th>
          <th>Buttons</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.title }}</td>
          <td>
            <button @click="openModal('edit', user)">Edit</button> |
            <button @click="deleteButton(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ modalType === 'add' ? 'Add Item' : 'Edit Item' }}</h2>
        <div v-if="modalType === 'add' || modalType === 'edit'">
          <label for="">Body</label>
          <input type="number" v-model="formData.body">
          <label for="">Title</label>
          <input type="text" v-model="formData.title">
          <div class="buttons">
            <button @click="confirmAction">{{ modalType === 'add' ? 'Add' : 'Update' }}</button>
            <button class="close" @click="closeModal">Close</button>
          </div>
        </div>
        <div v-if="modalType === 'delete'">
          <p>Are you sure you want to delete this item?</p>
          <div class="buttons">
            <button @click="confirmDelete">Yes</button>
            <button @click="cancelDelete">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
  data() {
    return {
      formData: {
        body: '',
        title: '',
      },
      users: [],
      showModal: false,
      modalType: '', // 'add', 'edit', or 'delete'
      currentId: null, // ID of the item to be edited or deleted
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async confirmAction() {
      if (this.modalType === 'add') {
        this.dataPost();
      } else if (this.modalType === 'edit') {
        this.updatePost();
      }
    },
    async dataPost() {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', this.formData);
        this.users.push(response.data);
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
    async updatePost() {
      try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${this.currentId}`, this.formData);
        const index = this.users.findIndex(user => user.id === this.currentId);
        this.users[index] = response.data;
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteButton(userId) {
      this.currentId = userId;
      this.modalType = 'delete';
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.currentId}`);
        this.users = this.users.filter(user => user.id !== this.currentId);
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
    cancelDelete() {
      this.closeModal();
    },
    openModal(type, user = null) {
      this.modalType = type;
      if (user) {
        this.currentId = user.id;
        this.formData = { body: user.body, title: user.title };
      } else {
        this.formData = { body: '', title: '' };
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalType = '';
      this.currentId = null;
    },
  },
};
</script>

<style>
/* General Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
}

/* Container Styles */
.container {
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Header */
h1 {
  color: #333;
  margin-bottom: 1rem;
}

/* Button Styles */
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 0.5rem;
}

button:hover {
  background-color: #0056b3;
}

/* Add Button Specific Style */
button.add-btn {
  background-color: #28a745;
}

button.add-btn:hover {
  background-color: #218838;
}

/* Table Styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

table th, table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table th {
  background-color: #007bff;
  color: white;
}

table tr:hover {
  background-color: #f1f1f1;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
}

.modal-content label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

.modal-content input {
  width: calc(100% - 2rem);
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.modal-content button {
  margin-top: 1rem;
}

.close {
  background-color: #dc3545;
}

.close:hover {
  background-color: #c82333;
}

.modal-content .buttons {
  display: flex;
  justify-content: flex-end;
}

.modal-content .buttons button {
  margin-left: 0.5rem;
}

</style>
