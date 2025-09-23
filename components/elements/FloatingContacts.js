import styles from './FloatingContacts.module.css'

export default function FloatingContacts() {
  const contacts = [
    {
      name: 'Messenger',
      icon: '/assets/images/icon/messenger-icon.png',
      link: 'https://m.me/NivexVN', 
      bgColor: '#040404',
      label: 'NivexVN'
    },
    {
      name: 'Zalo',
      icon: '/assets/images/icon/zalo-icon.png', 
      link: 'https://zalo.me/g/xhcwjb384', 
      bgColor: '#040404',
      label: 'NivexVN'
    },
    {
      name: 'Phone',
      icon: '/assets/images/icon/phone-icon.png',
      link: 'tel:+84974743849', 
      bgColor: '#040404',
      label: '097 474 3849'
    }
  ]

  return (
    <div className={styles.floatingContacts}>
      {contacts.map((contact, index) => (
        <a
          key={index}
          href={contact.link}
          target={contact.name === 'Phone' ? '_self' : '_blank'}
          rel={contact.name === 'Phone' ? '' : 'noopener noreferrer'}
          className={styles.contactButton}
          style={{ backgroundColor: contact.bgColor }}
          title={contact.name}
          data-label={contact.label}
        >
          <img 
            src={contact.icon} 
            alt={contact.name}
            className={styles.contactIcon}
          />
        </a>
      ))}
    </div>
  )
}