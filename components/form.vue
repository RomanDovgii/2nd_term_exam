<template>
  <div v-frag>
    <div style="display: none">{{form}}</div>
    <div v-if="formShown">
        <v-form>
                <v-btn @click="formShown = !formShown">Close</v-btn>
                <div v-if="form">
                    <div>
                        <label style="display: block;">
                            {{form.fields.type.title}}
                            <div v-if="form.fields.type.type === 'string'">
                                <v-text-field v-model="typeText"></v-text-field>
                            </div>
                            <div v-if="form.fields.type.type === 'select'">
                                <v-select v-model="typeSelect" :items="form.fields.type.values"></v-select>
                            </div>
                        </label>
                    </div>
                    <div>
                        <label style="display: block;">
                            {{form.fields.date.title}}
                            <div v-if="form.fields.date.type === 'string'">
                                <v-text-field v-model="dateText"></v-text-field>
                            </div>
                            <div v-if="form.fields.date.type === 'select'">
                                <v-select v-model="dateSelect" :items="form.fields.date.values"></v-select>
                            </div>
                        </label>
                    </div>
                    <div>
                        <label style="display: block;">
                            {{form.fields.victims.title}}
                            <div v-if="form.fields.victims.type === 'string'">
                                <v-text-field v-model="victimsText"></v-text-field>
                            </div>
                            <div v-if="form.fields.victims.type === 'select'">
                                <v-select v-model="victimsSelect" :items="form.fields.victims.values"></v-select>
                            </div>
                        </label>
                    </div>

                    <div v-if="(typeText !== '') || (typeSelect !== '')">
                        <label style="display: block;">
                            <div v-if="(typeText === 'acid_rain') || (typeSelect === 'acid_rain')">
                                {{form.reference_fields['type.acid_rain'].acid_power.title}}
                            </div>
                            <div v-if="(typeText === 'hurricane') || (typeSelect === 'hurricane')">
                                {{form.reference_fields['type.hurricane'].wind_speed.title}}
                            </div>
                            <div v-if="(typeText === 'earthquake') || (typeSelect === 'earthquake')">
                                {{form.reference_fields['type.earthquake'].earthquake_power.title}}
                            </div>
                            <div>
                                <v-text-field v-model="additionalText"></v-text-field>
                            </div>
                        </label>
                    </div>                 
                </div>
                <v-btn @click="send" style="margin-top: 20px; display: block;" type="submit">Send</v-btn>
        </v-form>
    </div>
    <div v-else>
        <v-btn @click="formShown = !formShown">Add new event</v-btn>
    </div>
  </div>
</template>

<script>
  import frag from "vue-frag";

  export default {
    directives: {
      frag
    },
    name: `Form`,
    data: () => ({
      formShown: false,
      typeText: ``,
      typeSelect: ``,
      dateText: ``,
      dateSelect: ``,
      victimsText: ``,
      victimsSelect: ``,
      additionalText: ``,
    }),
    methods: {
        send: function (evt) {
            evt.preventDefault();
            if (
                ((this.typeText !== '') || (this.typeSelect !== '')) &&
                ((this.dateText !== '') || (this.dateSelect !== '')) &&
                ((this.victimsText !== '') || (this.victimsSelect !== '')) &&
                (((this.additionalText !== '')))
            ) {
                let additionalData = {};

                switch (true) {
                    case this.typeText === 'acid_rain':
                        additionalData = {
                            acid_power: this.additionalText
                        }
                        break;
                    case this.typeSelect === 'acid_rain':
                        additionalData = {
                            acid_power: this.additionalText
                        }
                        break;
                    case this.typeText === 'hurricane':
                        additionalData = {
                            wind_speed: this.additionalText
                        }
                        break;
                    case this.typeSelect === 'hurricane':
                        additionalData = {
                            wind_speed: this.additionalText
                        }
                        break;
                    case this.typeText === 'earthquake':
                        additionalData = {
                            earthquake_power: this.additionalText
                        }
                        break;
                    case this.typeSelect === 'earthquake':
                        additionalData = {
                            earthquake_power: this.additionalText
                        }
                        break;
                }

                this.$store.dispatch('SEND_FORM_DATA', {
                    type: (this.typeText !== '') ?  this.typeText : this.typeSelect,
                    date: (this.dateText !== '') ?  this.dateText : this.dateSelect,
                    victims: (this.victimsText !== '') ?  this.victimsText : this.victimsSelect,
                    additionalData,
                });

                this.typeText = ``,
                this.typeSelect = ``,
                this.dateText = ``,
                this.dateSelect = ``,
                this.victimsText = ``,
                this.victimsSelect = ``,
                this.additionalText = ``,

                this.$store.dispatch('GET_EVENTS_DATA');
            }
        }
    },
    computed: {
      form: function () {
        this.$store.dispatch('GET_FORM_DATA');
        return this.$store.getters.GET_FORM_DATA;
      }
    }
  };
</script>