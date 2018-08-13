<template>
  <div class="sections-list">
    <StandardTable v-model="tableData" />
  </div>
</template>

<script>

  import getUserPermissionsTo from '../../apiCalls/users/getUserPermissionsTo';
  import NameCellContent from './NameCellContent.vue';
  import sortArrayOfObjectsWithName from '../../services/objects/sortArrayOfObjectsWithName';
  import StandardTable from '../layout/tables/Standard.vue';

  export default {
    components: {
      StandardTable
    },
    computed: {
      tableData() {

        let sections = [
          {
            id: 'trips',
            link: '/trips',
            name: this.$store.getters.getTranslations.trips.trips
          },
          {
            id: 'countries',
            link: '/countries',
            name: this.$store.getters.getTranslations.cities.countriesAndCities
          },
          {
            id: 'city-questions',
            link: '/cities/questions',
            name: this.$store.getters.getTranslations.cities.questions.questions
          },
          {
            id: 'user',
            link: '/user',
            name: this.$store.getters.getTranslations.user.userInformation
          },
          {
            id: 'users',
            link:  '/users',
            name: this.$store.getters.getTranslations.users.users
          }
        ].filter(
          section => this.allowedSections.includes(section.id)
        );

        return {
          rows: sortArrayOfObjectsWithName.alphabetically(
            sections
          ).map(section => {
            return {
              id: section.id,
              cells: [
                this.getNameCellData(section)
              ]
            }
          })
        };
      }
    },
    created() {
      
      let allowedSections = ['trips', 'user'];

      Promise.all([
        this.getUserHasPermissionToCities(),
        this.getUserHasPermissionToCityQuestions(),
        this.getUserHasPermissionToUsers()
      ]).then(hasPermission => {
        
        if(hasPermission[0]) {
          allowedSections.push('countries');
        }

        if(hasPermission[1]) {
          allowedSections.push('city-questions');
        }

        if(hasPermission[2]) {
          allowedSections.push('users');
        }

        this.allowedSections = allowedSections;
      });
    },
    data() {
      return {
        allowedSections: []
      }
    },
    methods: {
      getNameCellData(section) {
        return {
          content: NameCellContent,
          props: {
            id: section.id,
            name: section.name,
            link: section.link
          }
        };
      },
      getUserHasPermissionToCities() {

        let contentLoadingName = 'loadUserCityPermissions';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        return getUserPermissionsTo('cities').then(permissions => {
          this.$store.dispatch('endContentLoading', contentLoadingName);
          return permissions.length > 0;
        }).catch(error => {
          console.log(error);
        });
      },
      getUserHasPermissionToCityQuestions() {

        let contentLoadingName = 'loadUserCityQuestionsPermissions';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        return getUserPermissionsTo('city-questions').then(permissions => {
          this.$store.dispatch('endContentLoading', contentLoadingName);
          return permissions.length > 0;
        }).catch(error => {
          console.log(error);
        });
      },
      getUserHasPermissionToUsers() {

        let contentLoadingName = 'loadUserUsersPermissions';
        this.$store.dispatch('startContentLoading', contentLoadingName);

        return getUserPermissionsTo('users').then(permissions => {
          this.$store.dispatch('endContentLoading', contentLoadingName);
          return permissions.length > 0;
        }).catch(error => {
          console.log(error);
        });
      }
    }
  };
</script>

<style>
  .sections-list {
    padding-top: 15px;
  }
</style>