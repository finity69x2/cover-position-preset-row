Provides a means to program 3 preset position settings for programmable cover entities selectable from a Lovelace button row. THis plugin will also accept a "cover group" as the entity_id.

This pluig-in was inspired by user @ktownsend-personal  on the Home Assistant forum (community.home-assistant.io) as a thematically complementary plug-in for my other various control rows.

This element is completely theme-able to provide a match to the other control rows to provide a consistent look for the different elements in your Lovelace frontend

<b>Configuration Examples:</b>
    
  ```
    cards:
      - type: entities
        title: cover theme test
        show_header_toggle: false
        state_color: true
        entities:
          - type: custom:cover-position-preset-row
            name: Blind Custom Position
            entity: cover.blinds_test
            ## used to select your own customizable theme
            customTheme: true
            IsOpenColor: 'rgb(255, 0, 0)'
            IsMidOpenColor: '#888888'
            IsMidClosedColor: '#222222'
            IsClosedColor: 'purple'
            ButtonInactiveColor: 'black'
            ## used to set the custom setpoints for the cover (default is 0, 33, 66, and 99)
            customSetpoints: true
            OpenPosition: 85
            MidOpenPosition: 40
            MidClosePosition: 20
            ClosePosition: 8
            ## used to select custom text for the buttons (defaults to 0, 33, 66, 99. Or it defaults to the values of the setpoints if custom setpoints are used)
            customText: true
            customOpenText: open
            customMidOpenText: mop
            customMidClosedText: mcls
            customClosedText: cls
  ```

This is with the default Lovelace frontend theme set:

![Default](ex2.gif)


This is with the "Slate" frontend theme set:

![Slate](ex3.gif)

This is how this plugin looks with the Fan control & Binary Button Rows:

![Slate-Compare](button-row-example-compare.gif)
