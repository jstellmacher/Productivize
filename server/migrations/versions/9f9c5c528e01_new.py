"""new

Revision ID: 9f9c5c528e01
Revises: 
Create Date: 2023-07-11 17:44:27.634312

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f9c5c528e01'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('calendar_events',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('start', sa.DateTime(), nullable=False),
    sa.Column('end', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_calendar_events_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pages',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('title', sa.String(length=100), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_pages_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('blocks',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=100), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('page_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['page_id'], ['pages.id'], name=op.f('fk_blocks_page_id_pages')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_calendar_event_association',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('calendar_event_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['calendar_event_id'], ['calendar_events.id'], name=op.f('fk_user_calendar_event_association_calendar_event_id_calendar_events')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_calendar_event_association_user_id_users'))
    )
    op.create_table('bulleted_list_blocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['blocks.id'], name=op.f('fk_bulleted_list_blocks_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('heading_blocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['blocks.id'], name=op.f('fk_heading_blocks_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('image_blocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['blocks.id'], name=op.f('fk_image_blocks_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inputs',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('label', sa.String(length=100), nullable=False),
    sa.Column('value', sa.String(length=100), nullable=True),
    sa.Column('input_type', sa.String(length=50), nullable=False),
    sa.Column('placeholder', sa.String(length=100), nullable=True),
    sa.Column('block_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['block_id'], ['blocks.id'], name=op.f('fk_inputs_block_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('numbered_list_blocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['blocks.id'], name=op.f('fk_numbered_list_blocks_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('quote_blocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['blocks.id'], name=op.f('fk_quote_blocks_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('text_blocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['blocks.id'], name=op.f('fk_text_blocks_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('toggle_blocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['blocks.id'], name=op.f('fk_toggle_blocks_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('video_blocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['blocks.id'], name=op.f('fk_video_blocks_id_blocks')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('video_blocks')
    op.drop_table('toggle_blocks')
    op.drop_table('text_blocks')
    op.drop_table('quote_blocks')
    op.drop_table('numbered_list_blocks')
    op.drop_table('inputs')
    op.drop_table('image_blocks')
    op.drop_table('heading_blocks')
    op.drop_table('bulleted_list_blocks')
    op.drop_table('user_calendar_event_association')
    op.drop_table('blocks')
    op.drop_table('pages')
    op.drop_table('calendar_events')
    op.drop_table('users')
    # ### end Alembic commands ###