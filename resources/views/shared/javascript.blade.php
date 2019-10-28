<script>
  window.__INIT_DATA__ = {
    I18n: null,
    @if(userSignIn())
      currentUser: {{currentUser()->id}}
    @endif
  }
</script>
