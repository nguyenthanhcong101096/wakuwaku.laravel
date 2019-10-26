<header class="header js-header">
  <div class="container">
    <div class="navbar js-navbar">
      <div class="navbar__expanded js-navbar-expanded">
        <a href="" class="navbar__brand">@svg('new/img_logo-waku-news')</a>
        <div class="navbar__collapse js-navbar-collapse" role="button" aria-label="Display Menu"></div>
        <ul class="navbar-list">
          <li class="navbar-list__item"><a href="">Recap</a></li>
          <li class="navbar-list__item"><a href="">Writer</a></li>
          <li>
            <ul class="navbar-list-term">
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdujkxjrK2V8p0dtBEJ1ZUpvFvwd-CZRhBNDGgSP8O4ZZBmUw/viewform" target="_blank" rel="noreferrer">Writer apply</a></li>
              <li><a href="">Contact me</a></li>
              <li><a href="">Privacy</a></li>
              <li><a href="">About</a></li>
            </ul>
          </li>
          <li>
            <ul class="navbar-sns">
              <li class="navbar-sns__item">
                @svg('new/ico_fb-sns', ['widtd'=> '24px', 'height'=>'24px', "color"=>'#3b5997'])
              </li>
              <li class="navbar-sns__item">
                @svg('new/ico_twitter-sns', ['widtd'=> '24px', 'height'=>'24px', "color"=>'#00aced'])
              </li>
              <li class="navbar-sns__item">
                @svg('new/ico_line-sns', ['widtd'=> '24px', 'height'=>'24px', "color"=>'#03b404'])
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="navbar-action">
        <a href="" class="navbar-action__item">
          @svg('new/ico_search', ['width'=>'24px', 'height'=>'24px', 'class'=>'u-vertical-middle'])
        </a>

        @if(auth()->check())
          <div class="navbar-action__item dropdown dropdown--notification notification js-dropdown js-dropdown-notification u-hidden-mb">
            <%= inline_svg 'new/ico_noti.svg', size: '24px', class: 'u-vertical-middle js-dropdown-trigger noti-icon' %>
            <% count = current_user.count_notification %>
            <span class="<%= count > 0 ? 'noti-badge' : 'hidden' %> js-count-notification"></span>
            <div class="dropdown__body">
              <h3 class="dropdown__lead headline--sm u-text-center"><%= t('.notification') %></h3>
              <div class="dropdown__body-inner">
                <% if current_user.size_notifications.zero? %>
                  <p class="u-mt-8 u-ml-4">No notification</p>
                  <% else %>
                  <ul class="notification-list js-list-notification" data-notification="notification-member">
                    <%= render_li_notifications(current_user, { member: true }) %>
                  </ul>
                <% end %>
              </div>
              <%= link_to('See all', notification_me_path, class: 'dropdown--notification__action u-text-notice u-text-sm') unless current_user.size_notifications.zero? %>
            </div>
          </div>
          <%= link_to(notification_me_path, class: 'navbar-action__item notification u-hidden-pc', 'aria-label': 'Search Page') do %>
            <%= inline_svg 'new/ico_noti.svg', size: '24px', class: 'u-vertical-middle js-dropdown-trigger noti-icon' %>
              <% count = current_user.count_notification %>
            <span class="<%= count > 0 ? 'noti-badge' : 'hidden' %> js-count-notification"></span>
          <% end %>
        @endif

        <div class="navbar-action__item dropdown dropdown--menu js-dropdown">
          @if(auth()->check())
            <div class="tile tile--xs">
            <img src="{{auth()->avatar_url}}" alt="avatar" class="tile__icon js-dropdown-trigger">
            </div>
            <div class="dropdown__body">
              <div class="tile-wrapper u-mb-8">
                <%= link_to user_path do %>
                <a href="">
                  <div class="tile tile--sm tile--horizontal">
                    <img src="{{auth()->avatar_url}}" alt="avatar" class="tile__icon">
                    <div class="tile__content">
                      <h3 class="tile__title">{{auth()->name}}</h3>
                      <p class="u-text-sm u-text-red-500">Profile</p>
                    </div>
                  </div>
                </a>

                <div class="select-locale-wrap js-locale-selector" data-flag="<%= I18n.locale %>">
                  <select class="btn btn--default is-rounded select-locale">
                    {{-- <%= options_for_select(language_switcher_options, url_for(locale: I18n.locale)) %> --}}
                  </select>
                </div>
              </div>
              <ul class="dropdown-list">
                <li class="dropdown-list__item">
                  <%= link_to following_me_path do %>
                    <%= inline_svg 'new/ico_person-check_bordered.svg', size: '24px', class: 'u-vertical-middle' %><%= t('.following') %>
                  <% end %>
                </li>
                <li class="dropdown-list__item">
                  <%= link_to bookmarks_me_path do %>
                    <%= inline_svg 'new/ico_bookmark.svg', size: '24px', class: 'u-vertical-middle' %><%= t('.bookmarks') %>
                  <% end %>
                </li>
                <li class="dropdown-list__item <%= 'u-hidden' if current_user.member? %>">
                  <%= link_to writer_root_path do %>
                    <%= inline_svg 'new/ico_pen.svg', size: '24px', class: 'u-vertical-middle' %><%= t('.writer_dashboard') %>
                  <% end %>
                </li>
                <li class="dropdown-list__item <%= 'u-hidden' if current_user.writer? %>">
                  <%= link_to writers_apply_path do %>
                    <%= inline_svg 'new/ico_pen.svg', size: '24px', class: 'u-vertical-middle' %><%= t('.writer_apply') %>
                  <% end %>
                </li>
                <li class="dropdown-list__item">
                  <%= link_to signout_path, data: { method: :delete } do %>
                    <%= inline_svg 'new/ico_logout.svg', size: '24px', class: 'u-vertical-middle' %><%= t('.logout') %>
                  <% end %>
                </li>
              </ul>
            </div>
          @else
            <button aria-label="Display User Menu" class="js-dropdown-trigger">
              @svg('new/ico_user', ['width'=>'24px', 'height'=>'24px', 'class'=>'u-vertical-middle'])
            </button>
            <div class="dropdown__body">
              <div class="u-d-flex">
                <a href="" class="btn btn--red u-w-full"> Login </a>
                <div class="select-locale-wrap js-locale-selector u-ml-16" data-flag="<%= I18n.locale %>">
                <select class="btn btn--default is-rounded select-locale">
                  {{-- <%= options_for_select(language_switcher_options, url_for(locale: I18n.locale)) %> --}}
                </select>
                </div>
              </div>
            </div>
          @endif
        </div>
      </div>
    </div>
  </div>
</header>
  