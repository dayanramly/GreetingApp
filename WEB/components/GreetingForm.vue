<template>
  <div>
    <form class="max-w-md mx-auto mt-12 bg-[#e2e8f0]" @submit.prevent="handleSubmit">
      <div class="my-8">
        <h2 class="text-2xl font-bold">Greeting Card App</h2>
      </div>
      <div class="mb-4">
        <label for="senderName" class="block font-bold mb-2">Your Name:</label>
        <input
          id="senderName"
          v-model.trim="$v.senderName.$model"
          type="text"
          name="senderName"
          :class="{ 'border-red-500': $v.senderName && $v.senderName.$error }"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="John Doe"
          required
        />
        <div class="error-message">{{ $v.senderName.$error ? 'Your name is required.' : '' }}</div>
      </div>

      <div class="mb-4">
        <label for="senderEmail" class="block font-bold mb-2">Your Email:</label>
        <input
          id="senderEmail"
          v-model.trim="$v.senderEmail.$model"
          type="email"
          name="senderEmail"
          :class="{ 'border-red-500': $v.senderEmail.$error }"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="johndoe@example.com"
          required
        />
        <div class="error-message">{{ $v.senderEmail.$error || !$v.senderEmail.email ? 'Please enter a valid email address.' : '' }}</div>
      </div>

      <div class="mb-4">
        <label for="recipientName" class="block font-bold mb-2"
          >Recipient's Name:</label
        >
        <input
          id="recipientName"
          v-model.trim="$v.recipientName.$model"
          type="text"
          name="recipientName"
          :class="{ 'border-red-500': $v.recipientName.$error }"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Jane Smith"
          required
        />
        <div class="error-message">{{ $v.recipientName.$error ? "Recipient's name is required." : '' }}</div>
      </div>

      <div class="mb-4">
        <label for="recipientEmail" class="block font-bold mb-2"
          >Recipient's Email:</label
        >
        <input
          id="recipientEmail"
          v-model.trim="$v.recipientEmail.$model"
          type="email"
          name="recipientEmail"
          :class="{ 'border-red-500': $v.recipientEmail.$error }"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="janesmith@example.com"
          required
        />
        <div class="error-message">{{ $v.recipientEmail.$error || !$v.recipientEmail.email ? 'Please enter a valid email address.' : '' }}</div>
      </div>

      <div class="mb-4">
        <label for="message" class="block font-bold mb-2">Message:</label>
        <textarea
          id="message"
          v-model.trim="$v.message.$model"
          name="message"
          :class="{ 'border-red-500': $v.message.$error }"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your message here..."
          required
        ></textarea>
        <div class="error-message">{{ $v.message.$error ? 'Message is required.' : '' }}</div>
      </div>

      <button
        type="submit"
        :disabled="$v.$invalid || loading"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
          <template v-if="loading">
            <div class="flex">
              <svg class="animate-spin h-5 w-5 text-gray-500 mx-auto mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4"></circle>
                <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          </template>
          <template v-else>
            Submit
          </template>
      </button>

      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline"> Your greeting has been sent.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="success = false"><title>Close</title><path d="M14.348 5.652a.999.999 0 0 0-1.414 0L10 8.586 6.066 4.652a.999.999 0 1 0-1.414 1.414L8.586 10l-3.934 3.934a.999.999 0 1 0 1.414 1.414L10 11.414l3.934 3.934a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10l3.934-3.934a.999.999 0 0 0 0-1.414z"/></svg>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  name: 'GreetingForm',
  data() {
    return {
      senderName: '',
      senderEmail: '',
      recipientName: '',
      recipientEmail: '',
      message: '',
      error: '',
      loading: false,
      success: false,
    };
  },
  validations: {
    senderName: {
      required,
    },
    senderEmail: {
      required,
      email,
    },
    recipientName: {
      required,
    },
    recipientEmail: {
      required,
      email,
    },
    message: {
      required,
    },
  },
  methods: {
    async handleSubmit() {

      this.$v.$touch();

      // Check for validation errors
      if (!this.$v.$invalid) {
        // Set loading state
        this.loading = true;

        try {
          // Send API request
          await axios.post(`${process.env.apiBaseUrl}/api/greetings`, {
            sender_name: this.senderName,
            sender_email: this.senderEmail,
            recipient_name: this.recipientName,
            recipient_email: this.recipientEmail,
            message: this.message,
          });
        } catch (error) {
          // Set error state
          console.error(error);
          this.error = 'An error occurred. Please try again later.';
        } finally {
          // Reset loading state
          setTimeout(() => {
            this.loading = false;
            this.success = true;
            this.$v.$reset();
            this.senderName = '';
            this.senderEmail = '';
            this.recipientName = '';
            this.recipientEmail = '';
            this.message = '';
          }, 3000)
        }
      }
    },
  }
};
</script>

<style>
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>