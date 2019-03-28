<template>
    <div class="signup container">
        <form @submit.prevent="signup" class="card-panel">
            <h2 class="center deep-purple-text">Signup</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input name="email" type="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input name="password" type="password" v-model="password">
            </div>
            <div class="field">
                <label for="username">Username:</label>
                <input name="username" type="text" v-model="username">
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">signup</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'signup',
    data() {
        return {
            email: null,
            password: null,
            username: null,
            feedback: null
        }
    },
    methods: {
    signup() {
        if(this.username && this.email && this.password) {
            this.slug = slugify(this.username, {
                replacement: '-',
                remove: /[$*_+~.()'"!\-:@']/,
                lower: true
            })
            let ref = db.collection('users').doc(this.slug)
            ref.get().then(doc => {
                if(doc.exists){
                    this.feedback = "This username already exists"
                } else {
                    this.feedback = "This username is available"
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(cred => {
                        ref.set({
                            username: this.username,
                            geolocation: null,
                            user_id: cred.user.uid
                        })
                    })
                    .then(() => {
                        this.$router.push({ name: 'GMap' })
                    })
                    .catch(err => {
                        this.feedback = err.message
                    }) 

                }
            })
            console.log(this.slug)
        } else {
                this.feedback = 'You must enter all fields'
            }
        }
    }
}
</script>

<style  lang="sass">
.signup
    max-width: 400px
    margin-top: 60px
.signup h2
    font-size: 2.4em
.field
    margin-bottom: 16px
</style>
