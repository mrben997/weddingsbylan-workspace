'use client'
import React from 'react'
import './style.scss'
import { ImagePath } from '@/shared/config'
import { getEditModeKey } from '@/shared/components/edit.mode'
import { IOurTeamInfoForm, IOurTeamMemberForm } from '@/admin-react-app/pages/settings/setting.form.types'

// ─── Default fallback data ────────────────────────────────────────────────────

const defaultInfo = {
  Title: 'OUR AMAZING TEAM',
  Description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin, tellus vitae condimentum egestas, libero dolor auctor tellusconsequat ipsutis sem niuis sed odio sit amet.'
} as IOurTeamInfoForm

const defaultMembers = [
  { Name: 'Sophia Carter', Role: 'Lead Photographer', ImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&grayscale' },
  { Name: 'Isabella Moore', Role: 'Senior Photographer', ImageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80&grayscale' },
  { Name: 'James Nguyen', Role: 'Videographer', ImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&grayscale' },
  { Name: 'Emily Davis', Role: 'Photo Editor', ImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&grayscale' },
  { Name: 'Lucas Bennett', Role: 'Wedding Coordinator', ImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&grayscale' },
  { Name: 'Olivia Wilson', Role: 'Makeup Artist', ImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&grayscale' },
  { Name: 'Ethan Walker', Role: 'Lighting Specialist', ImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&grayscale' },
  { Name: 'Ava Thompson', Role: 'Hair Stylist', ImageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80&grayscale' }
] as IOurTeamMemberForm[]

// ─── Component ────────────────────────────────────────────────────────────────

interface IOurTeamViewProps {
  info?: IOurTeamInfoForm | null
  members?: IOurTeamMemberForm[] | null
}

const OurTeamView: React.FC<IOurTeamViewProps> = (props) => {
  const info = props.info ?? defaultInfo
  const members = props.members && props.members.length > 0 ? props.members : defaultMembers

  const getMemberImageUrl = (member: IOurTeamMemberForm) => {
    if (!member.ImageUrl) return undefined
    // External URL (unsplash fallback) — dùng trực tiếp
    if (member.ImageUrl.startsWith('http')) return member.ImageUrl
    // Internal upload — thêm ImagePath prefix
    return `${ImagePath}/${member.ImageUrl}`
  }

  return (
    <div className='our-team-wrapper'>
      <main className='our-team-page'>
        {/* Header */}
        <section className='our-team-header' {...getEditModeKey('OurTeamInfo')}>
          <h1 className='our-team-title typography-h1'>{info.Title ?? defaultInfo.Title}</h1>
          <div className='our-team-divider'>
            <span className='divider-line' />
            <span className='divider-dot' />
            <span className='divider-line' />
          </div>
          <p className='our-team-description typography-body1 text-italic'>
            {info.Description ?? defaultInfo.Description}
          </p>
        </section>

        {/* Team Grid */}
        <section className='our-team-grid-section'>
          <div className='our-team-grid' {...getEditModeKey('OurTeamMembers')}>
            {members.map((member, index) => (
              <div key={index} className='team-member-card' >
                <div className='team-member-image-wrapper'>
                  <img
                    src={getMemberImageUrl(member)}
                    alt={member.Name}
                    className='team-member-image'
                  />
                  <div className='team-member-overlay'>
                    <div className='team-member-info'>
                      <h3 className='team-member-name'>{member.Name}</h3>
                      <p className='team-member-role'>{member.Role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default OurTeamView
