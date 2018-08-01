<template>
  <div>
    <h3>{{translations.users}}</h3>
    <StandardTable v-model="tableData" />
  </div>
</template>

<script>

  import getUsers from '../../apiCalls/users/getUsers';
  import NameCellContent from './NameCellContent.vue';
  import StandardTable from '../layout/tables/Standard.vue';

  export default {
    components: {
      StandardTable
    },
    computed: {
      tableData() {
        return {
          rows: this.users.map(user => {
            return {
              id: user.id,
              cells: [
                this.getNameCellData(user)
              ]
            }
          })
        };
      },
      translations() {
        return this.$store.getters.getTranslations.users;
      }
    },
    created() {
      this.updateUserList();
    },
    data() {
      return {
        users: []
      }
    },
    methods: {
      getNameCellData(user) {
        return {
          content: NameCellContent,
          props: {
            user
          }
        };
      },
      updateUserList() {

        this.$store.dispatch('startContentLoading', 'loadUsers');

        getUsers().then(users => {
          this.users = users;
          this.$store.dispatch('endContentLoading', 'loadUsers');
        }).catch(error => {
          console.log(error);
        });
      }
    }
  };
</script>