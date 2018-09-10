<template>
  <div>
    <h3>
      <router-link :to="'/trips'">
        {{translations.trips}}
      </router-link>
      &gt;
      <router-link :to="tripLink">
        {{trip.name}}
      </router-link>
      &gt;
      {{city.name}}
    </h3>
    <ArticleLanguageVersionsList v-if="article !== null"
                                 :article="article"
                                 :visitId="$route.params.visitId" />
    <NewArticleButton v-if="article === null" />
    <NewArticleTranslationButton v-if="article !== null" />
  </div>
</template>

<script>

  import ArticleLanguageVersionsList from './ArticleLanguageVersionsList.vue';
  import getTripCityVisit from '../../../../apiCalls/trips/getTripCityVisit';
  import NewArticleButton from './NewArticleButton.vue';
  import NewArticleTranslationButton from './NewArticleTranslationButton.vue';

  export default {
    components: {
      ArticleLanguageVersionsList,
      NewArticleButton,
      NewArticleTranslationButton
    },
    computed: {
      tripLink() {
        return '/trips/' + this.trip.id;
      },
      translations() {
        return this.$store.getters.getTranslations.trips;
      }
    },
    created() {
      this.updateVisit();

      if(typeof this.openLayover !== 'undefined') {
        this.openLayover(this.updateVisit);
      }
    },
    data() {
      return {
        article: null,
        city: {
          name: null
        },
        trip: {
          id: null,
          name: null
        }
      }
    },
    methods: {
      updateVisit() {

        this.$store.dispatch('startContentLoading', 'loadVisit');

        getTripCityVisit(this.$route.params.visitId, 'fi').then(visit => {
          this.article = visit.article;
          this.city = visit.city;
          this.trip = visit.trip;
          this.$store.dispatch('endContentLoading', 'loadVisit');
        }).catch(error => {
          console.log(error);
        });
      }
    },
    props: ['openLayover']
  };
</script>